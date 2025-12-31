import React from "react";

const heroImage =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80";

export default function WhoIAmSection() {
  return (
    <section className="bg-white text-black py-16 md:py-24">
      {/* TEXT — padded heavily */}
      <div className="max-w-6xl mx-auto px-10 md:px-16 lg:px-45 space-y-10">
        <div className="space-y-6 text-lg md:text-xl text-gray-800 leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel
            sapien neque. Integer vehicula, velit et tristique viverra, justo
            nulla tempor mi, ut varius urna lorem ac augue. Vivamus a lectus
            eget sem ullamcorper pulvinar.
          </p>
          <p>
            Curabitur id libero sed urna luctus pharetra. Nulla facilisi. Sed
            vitae hendrerit arcu. Suspendisse euismod, urna vel feugiat
            facilisis, orci justo malesuada massa, nec placerat lorem dolor eget
            lacus. Donec pharetra arcu sit amet tempor porttitor.
          </p>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Phasellus in cursus leo, id volutpat eros.
            Mauris pharetra lorem nec turpis fringilla, ac vulputate risus
            vehicula. Aliquam erat volutpat.
          </p>
          <p>
            Integer sodales, eros eu feugiat efficitur, lorem nibh rhoncus est,
            sit amet vehicula justo odio at ipsum. Pellentesque in tincidunt
            turpis, sed mattis odio. Duis dictum tortor a leo dapibus, in
            iaculis felis venenatis.
          </p>
          <p>
            Morbi bibendum, magna non consectetur varius, lorem eros laoreet
            justo, non venenatis eros arcu et libero. Suspendisse potenti.
            Maecenas imperdiet, justo eget hendrerit dapibus, justo lectus
            condimentum lorem, a gravida ligula velit quis ipsum.
          </p>
          <p>
            Nunc porttitor, ex sed pharetra ultrices, tortor nibh interdum nunc,
            quis cursus mi ex non ipsum. Nam eget rhoncus velit. Vivamus auctor
            convallis lorem, a volutpat justo pulvinar a. Sed sed dui eros.
          </p>
        </div>
      </div>

      {/* IMAGE — full viewport width */}
      <div className="w-screen overflow-hidden mt-16">
        <img
          src={heroImage}
          alt="Scenic landscape"
          className="w-full h-[320px] md:h-[420px] lg:h-[520px] object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
}
