/**
 * The fetch will not works on the local environment because CORS policy
 */

// const data = {
//   hasNext: true,
//   testimonials: [
//     {
//       message: 'Excellent product!',
//       id: '42',
//     },
//     {
//       message: 'Love it, 5/5 stars!',
//       id: '42',
//     },
//   ],
// };

const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials';
let lastTestimonialId;
let hasNextFlag;
let ongoingRequest = false;
const testimonialContainer = document.querySelector('#testimonial-container');

const getURL = function ({ limit, after }) {
  const url = new URL(API_BASE_URL);
  url.searchParams.set('limit', limit);

  if (after) {
    url.searchParams.set('after', after);
  }

  return url;
};

const getTestimonials = async function (limit = 5, after) {
  if (ongoingRequest) {
    return;
  }

  const url = getURL({ limit, after });

  try {
    ongoingRequest = true;
    const response = await fetch(url);
    const testimonials = await response.json();

    return testimonials;
  } catch (error) {
    console.log(error.message);
  } finally {
    ongoingRequest = false;
  }
};

const createTestimonial = function ({ message }) {
  const testimonial = document.createElement('p');
  const content = document.createTextNode(message);
  testimonial.classList.add('testimonial');
  testimonial.appendChild(content);

  return testimonial;
};

const renderTestimonials = function ({ testimonials }) {
  const fragment = new DocumentFragment();
  const testimonialContainer = document.querySelector('#testimonial-container');
  testimonials.forEach((testimonial) => {
    fragment.append(createTestimonial(testimonial));
  });
  testimonialContainer.append(fragment);
};

const saveLastTestimonialId = function ({ testimonials }) {
  if (!testimonials.length) {
    return;
  }
  lastTestimonialId = testimonials[testimonials.length - 1].id;
};

const saveHasNextFlag = function ({ hasNext }) {
  hasNextFlag = hasNext;
};

const reachBottomScrollContainer = function (container) {
  const { clientHeight, scrollHeight, scrollTop } = container;

  return scrollHeight - scrollTop - clientHeight <= 0;
};

const processAfterGetTestimonials = function (testimonials) {
  renderTestimonials(testimonials);
  saveLastTestimonialId(testimonials);
  saveHasNextFlag(testimonials);
};

const scrollTestimonials = async function () {
  if (!reachBottomScrollContainer(testimonialContainer)) {
    return;
  }

  if (!hasNextFlag) {
    return;
  }

  try {
    const testimonials = await getTestimonials(5, lastTestimonialId);
    processAfterGetTestimonials(testimonials);
  } catch (error) {
    console.log(error);
  }
};

const init = async function () {
  testimonialContainer.addEventListener('scroll', scrollTestimonials);
  try {
    const testimonials = await getTestimonials(5, lastTestimonialId);
    processAfterGetTestimonials(testimonials);
  } catch (error) {
    console.log(error);
  }
};

init();
