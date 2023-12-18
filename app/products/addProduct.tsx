'use client';
import type { brand } from '@prisma/client';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddProduct = ({ brands }: { brands: brand[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post('/api/products', {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    setTitle('');
    setPrice('');
    setBrand('');
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className='btn' onClick={handleModal}>
        Add New
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add New Product</h3>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setPrice(e.target.value)}
                type='text'
                className='input input-bordered'
                placeholder='Price'
              />
            </div>
            <div className='form-control w-full'>
              <label className='font-bold label'>Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className='select select-bordered'
              >
                <option value='' disabled>
                  Select a Brand
                </option>
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
