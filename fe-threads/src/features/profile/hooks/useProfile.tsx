import React, { ChangeEvent } from 'react';
import { IUser } from '@/types/User';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/type/RootState';
import { API } from '@/libs/api';

export function useProfile() {
  const auth = useSelector((state: RootState) => state.auth);
  const [form, setForm] = React.useState<IUser>(auth);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files && files[0]) {
      const file = files[0];

      // Check if the file is an image
      if (file.type.startsWith('image/')) {
        setForm({...form, picture: URL.createObjectURL(file)});
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setForm({...form, picture: reader.result as string});
        });
        reader.readAsDataURL(file);
        setForm({
          ...form,
          [name]: file,
        });
      } else {
        // Handle non-image file case (optional)
        console.error('Invalid file type. Please upload an image.');
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  async function handleSubmit(id: number) {
    try {
      const response = await API.patch(`/user/${id}`, form)

      console.log(response)
    } catch (err) {
      throw err
    }
  }

  return {
    form,
    handleChange,
    handleSubmit
  };
}
