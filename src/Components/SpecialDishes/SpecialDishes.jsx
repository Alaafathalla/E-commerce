import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import dish1 from '../../assets/home/dish1.png';
import dish2 from '../../assets/home/dish2.png';
import dish3 from '../../assets/home/dish3.png';
import dish4 from '../../assets/home/dish4.png';
import dish5 from '../../assets/home/dish5.png';
import { Heart } from 'lucide-react';

const dishes = [
  { title: 'Fattoush salad', description: 'A refreshing Levantine salad.', image: dish1 },
  { title: 'Vegetable salad', description: 'Fresh garden vegetables.', image: dish2 },
  { title: 'Egg vegi salad', description: 'Boiled egg and greens combo.', image: dish3 },
  { title: 'Grilled veggie bowl', description: 'Charred vegetables with herbs.', image: dish4 },
  { title: 'Caesar salad', description: 'Classic Caesar with a twist.', image: dish5 },
];

export default function SpecialDishesSlider() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-2 lg:px-4 py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <p className="text-sm text-red-500 font-semibold tracking-wide uppercase mb-2">
        Special Dishes
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight text-gray-800 dark:text-white">
        Standout Dishes<br />From Our Menu
      </h2>

      <Splide
        options={{
          perPage: 3,
          gap: '1rem',
          arrows: true,
          pagination: false,
          rewind: true,
          breakpoints: {
            1280: { perPage: 2 },
            768: { perPage: 1 },
          },
        }}
        aria-label="Special Dishes Slider"
      >
        {dishes.map((dish, idx) => (
          <SplideSlide key={idx}>
            <div className="relative bg-white dark:bg-gray-800 shadow-md dark:shadow-none hover:shadow-lg dark:hover:shadow-md transition rounded-xl p-4 sm:p-10 flex flex-col items-center text-center h-full text-gray-800 dark:text-white">
              <div className="absolute top-0 right-0 bg-red-500 p-2 rounded-bl-xl text-white">
                <Heart size={16} />
              </div>
              <img
                src={dish.image}
                alt={dish.title}
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full shadow dark:shadow-md mb-4"
              />
              <h3 className="font-semibold text-lg sm:text-xl mb-1">{dish.title}</h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
                {dish.description}
              </p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}


