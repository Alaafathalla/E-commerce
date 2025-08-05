// components/SpecialDishesSlider.jsx
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import dish1 from '../../assets/home/dish1.png'
import dish2 from '../../assets/home/dish2.png';
import dish3 from '../../assets/home/dish3.png';
import dish4 from '../../assets/home/dish4.png';
import dish5 from '../../assets/home/dish5.png';
import { Heart } from 'lucide-react';

const dishes = [
  {
    title: 'Fattoush salad',
    description: 'Description of the item',
    image: dish1,
  },
  {
    title: 'Vegetable salad',
    description: 'Description of the item',
    image: dish2,
  },
  {
    title: 'Egg vegi salad',
    description: 'Description of the item',
    image:dish3,
  },
    {
    title: 'Vegetable salad',
    description: 'Description of the item',
    image: dish4,
  },
      {
    title: 'Vegetable salad',
    description: 'Description of the item',
    image: dish5,
  },
];

export default function SpecialDishesSlider() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <p className="text-sm text-red-500 font-semibold tracking-wide uppercase mb-2">
        Special Dishes
      </p>
      <h2 className="text-3xl font-bold mb-6">
        Standout Dishes<br />From Our Menu
      </h2>

      <Splide
        options={{
          perPage: 3,
          gap: '1rem',
          arrows: true,
          pagination: false,
          breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 1 },
          },
        }}
        aria-label="Special Dishes Slider"
      >
        {dishes.map((dish, idx) => (
          <SplideSlide key={idx}>
            <div className="relative bg-white shadow rounded-xl p-4 flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 bg-red-500 p-2 rounded-bl-xl text-white">
                <Heart size={16} />
              </div>
              <img src={dish.image} alt={dish.title} className="w-32 h-32 object-cover rounded-full shadow mb-4" />
              <h3 className="font-semibold text-lg">{dish.title}</h3>
              <p className="text-sm text-gray-500">{dish.description}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
