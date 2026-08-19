import React from "react";
import { Mail, Instagram } from "lucide-react";

const WHATSAPP_NUMBER = "919911165111";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I have a question for India Contemporary."
)}`;

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.36.657 4.566 1.797 6.45L3 29l7.222-2.257A12.44 12.44 0 0016 28c6.894 0 12.5-5.607 12.5-12.5S22.895 3 16.001 3zm0 22.7a10.16 10.16 0 01-5.18-1.42l-.372-.22-4.286 1.34 1.36-4.176-.242-.385A10.15 10.15 0 015.8 15.5c0-5.634 4.567-10.2 10.201-10.2 5.633 0 10.2 4.566 10.2 10.2 0 5.633-4.567 10.2-10.2 10.2zm5.593-7.646c-.306-.153-1.81-.893-2.091-.995-.28-.102-.484-.153-.688.153-.204.306-.79.995-.968 1.199-.178.204-.357.23-.663.077-.306-.153-1.293-.477-2.463-1.52-.91-.812-1.525-1.815-1.703-2.121-.178-.306-.019-.472.134-.624.138-.137.306-.357.459-.535.153-.178.204-.306.306-.51.102-.204.051-.383-.026-.536-.077-.153-.688-1.658-.943-2.271-.248-.596-.5-.516-.688-.525l-.586-.01c-.204 0-.535.076-.815.383-.28.306-1.068 1.044-1.068 2.548 0 1.503 1.093 2.955 1.245 3.159.153.204 2.15 3.283 5.208 4.604.728.314 1.295.502 1.738.642.73.232 1.394.199 1.92.121.586-.088 1.81-.74 2.065-1.454.255-.715.255-1.327.179-1.454-.077-.128-.281-.204-.587-.357z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform duration-300"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>

      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            Get In Touch
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-8">
            Contact Us
          </h1>
          <p className="text-base text-ink-secondary font-sans font-light leading-relaxed mb-12">
            Questions about a piece, shipping to your country, or interested in
            having us represent your work? Reach out directly.
          </p>

          <div className="flex flex-col items-center gap-4 font-sans text-ink-secondary">
            <a
              href="mailto:hello@indiacontemporary.net"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail size={16} strokeWidth={1.5} /> hello@indiacontemporary.net
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" /> Udit Hooda, +91 99111 65111
            </a>
            <a
              href="https://www.instagram.com/indiacontemporary.art"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Instagram size={16} strokeWidth={1.5} /> @indiacontemporary.art
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
