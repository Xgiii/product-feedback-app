import AuthCheck from '@/components/AuthCheck';
import MainBtn from '@/components/MainBtn';
import SecondaryBtn from '@/components/SecondaryBtn';
import { categories } from '@/utils';
import Link from 'next/link';
import { addFeedback } from '../actions';

function AddFeedbackPage() {
  return (
    <AuthCheck>
      <form
        action={addFeedback}
        className='flex flex-col space-y-8 mx-auto my-10 w-[90vw] rounded-lg p-6 bg-white sm:w-[600px]'
      >
        <h1 className='text-2xl font-bold text-gray-800'>
          Create New Feedback
        </h1>
        <div>
          <label className='font-semibold text-gray-800'>Feedback Title</label>
          <p className='text-sm mt-1 text-gray-500'>
            Add a short, descriptive title
          </p>
          <input
            required
            type='text'
            name='title'
            className='bg-gray-100 p-2 mt-4 rounded-sm w-full focus:outline-purple-600 transition-all duration-300 outline outline-2 outline-transparent focus:invalid:outline-pink-600'
          />
        </div>
        <div>
          <label className='font-semibold text-gray-800'>Category</label>
          <p className='text-sm mt-1 text-gray-500'>
            Choose a category for your feedback
          </p>
          <select
            name='category'
            className='bg-gray-100 p-2 mt-4 rounded-sm w-full outline-purple-600'
          >
            {categories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='font-semibold text-gray-800'>
            Feedback Details
          </label>
          <p className='text-sm mt-1 text-gray-500'>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea
            required
            minLength={10}
            maxLength={256}
            name='details'
            className='bg-gray-100 p-2 mt-4 rounded-sm w-full focus:outline-purple-600 transition-all duration-300 outline outline-2 outline-transparent focus:invalid:outline-pink-600'
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <MainBtn className='py-3'>Add Feedback</MainBtn>
          <Link href='/home' className='flex flex-col'>
            <SecondaryBtn className='py-3'>Cancel</SecondaryBtn>
          </Link>
        </div>
      </form>
    </AuthCheck>
  );
}

export default AddFeedbackPage;
