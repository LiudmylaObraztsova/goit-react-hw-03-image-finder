import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const apiKey = '22061435-2d2a9a5944c625b4390ff8963';

const fetchImg = ({ searchQuery, currentPage = 1, perPage = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&per_page=${perPage}&key=${apiKey}&page=${currentPage}`,
    )
    .then(res => res.data.hits);
};

export default {fetchImg};