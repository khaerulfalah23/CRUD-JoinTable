'use client';
import type { brand } from '@prisma/client';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const UpdateProduct = ({
  brands,
  product,
}: {
  brands: brand[];
  product: Product;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brandId);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(`/api/products/${product.id}`, {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className='btn btn-info btn-sm' onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Update {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className='form-control w-full'>
              <label className='font-bold label'>Product Name</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                className='input input-bordered'
                placeholder='Product Name'
              />
            </div>
            <div className='form-control w-full'>
              <label className='font-bold label'>Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                type='text'
                className='input input-bordered'
                placeholder='Price'
              />
            </div>
            <div className='form-control w-full'>
              <label className='font-bold label'>Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(Number(e.target.value))}
                className='select select-bordered'
              >
                {brands?.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='modal-action'>
              <button type='button' className='btn' onClick={handleModal}>
                Close
              </button>
              <button type='submit' className='btn btn-primary'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
