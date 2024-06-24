"use client";
import ContactForm from "./Form";

export default function Contact() {
  return (
    <section id="contact">
      <div
        className="anchor relative z-10
    py-[60px]   md:pb-[60px] md:pt-[60px] xl:pb-[100px] xl:pt-[100px] 2xl:pb-[40px] 2xl:pt-[40px]
    "
      >
        <div className="container grid lg:grid-cols-2 sm:grid-cols-1">
          <div className="container items-left">
            <h3 className="">Contact Us</h3>
            <p className="text-base max-w-screen-sm   mb-8">
              If you have questions or technical issues just send us a mail.
              You can cancel your subscription by contacting us.
            </p>
          </div>
          <div className="container">
            <div id="contactForm">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
