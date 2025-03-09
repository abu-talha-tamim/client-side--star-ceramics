import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <nav>
            <h6 className="footer-title mb-4 text-lg font-semibold">
              Services
            </h6>
            <ul className="space-y-2">
              <li>
                <a className="link link-hover">Branding</a>
              </li>
              <li>
                <a className="link link-hover">Design</a>
              </li>
              <li>
                <a className="link link-hover">Marketing</a>
              </li>
              <li>
                <a className="link link-hover">Advertisement</a>
              </li>
            </ul>
          </nav>
          <nav>
            <h6 className="footer-title mb-4 text-lg font-semibold">Company</h6>
            <ul className="space-y-2">
              <li>
                <a className="link link-hover">About us</a>
              </li>
              <li>
                <a className="link link-hover">Contact</a>
              </li>
              <li>
                <a className="link link-hover">Jobs</a>
              </li>
              <li>
                <a className="link link-hover">Press kit</a>
              </li>
            </ul>
          </nav>
          <nav>
            <h6 className="footer-title mb-4 text-lg font-semibold">Legal</h6>
            <ul className="space-y-2">
              <li>
                <a className="link link-hover">Terms of use</a>
              </li>
              <li>
                <a className="link link-hover">Privacy policy</a>
              </li>
              <li>
                <a className="link link-hover">Cookie policy</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
