import React from "react";
import { ShieldCheck, PackageCheck, Headphones, Truck } from "lucide-react";
import { Helmet } from "react-helmet";
const stats = [
  { value: "0.1k", label: "Vendors" },
  { value: "23k", label: "Customers" },
  { value: "2k", label: "Products" },
];

const features = [
  {
    icon: PackageCheck,
    title: "Product Packing",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  },
  {
    icon: Headphones,
    title: "24x7 Support",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  },
  {
    icon: Truck,
    title: "Delivery in 5 Days",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  },
  {
    icon: ShieldCheck,
    title: "Payment Secure",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  },
];

export default function AboutSection({
  image = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1470&auto=format&fit=crop",
}) {
  return (
    <>      <Helmet>
  <title>About Us</title>
  <meta name="description" content="Learn more about our hotel, team, and mission to serve guests with excellence." />
  <meta property="og:title" content="About Us" />
</Helmet>
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">


      {/* Top: Heading + body + stats + image */}
      <div className="grid items-start gap-10 md:grid-cols-2">
        {/* Copy column */}
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
            About The Carrot
          </h2>

          <div className="mt-5 space-y-4 text-gray-600">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione,
              recusandae necessitatibus quasi incidunt alias adipisci pariatur
              earum iure beatae assumenda rerum quod. Tempora magni autem a
              voluptatibus beatae.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae
              rerum cum accusamus magni consequuntur architecto, ipsam deleniti
              expedita doloribus suscipit voluptatum eius perferendis amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium, maxime amet architecto? Iure exercitationem optio ea
              maiores corporis beatae, dolores doloribus libero nesciunt qui
              illum? Voluptates deserunt adipisci voluptatem magni sunt sed
              blanditiis quod aspernatur! Iusto?
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm backdrop-blur">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col rounded-xl px-3 py-2 text-center"
              >
                <div className="text-3xl font-semibold tracking-tight text-gray-900">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase text-gray-500">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image column */}
        <div className="order-1 md:order-2 d-flex items-center ">
          <div className="relative overflow-hidden rounded-2xl mt-2 lg:mt-14 sm:mt-3 shadow-lg ring-1 ring-black/5">
            <img
              src={image}
              alt="Fresh vegetables on a market table"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto mt-12 h-px w-full max-w-5xl bg-gray-100" />

      {/* Bottom: Feature cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            {/* Tiny accent line */}
            <div className="absolute inset-x-6 top-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />

            <div className="flex flex-col items-center">
              <div className="rounded-xl inline-block border border-gray-200 bg-white dark:bg-indigo-900 dark:hover:bg-indigo-600 hover:bg-gray-200 p-2">
                <Icon className="h-5 w-5 " aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
          </div>
        ))}
        
      </div>
    </section>
    </>
  );
}
