import { Component } from 'react';
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './components/ImageGallery';
import Container from './components/Container';
import Seachbar from './components/Searchbar/Searchbar';
import Api from './api/imageApi';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Modal from './components/Modal/Modal';
import Button from './components/Button';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    showModal: false,
    searchQuery: '',
    currentPage: 1,
    modalImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImg();
    }
  }

  fetchImg = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    if (!searchQuery) {
      return;
    }

    Api.fetchImg(options)
      .then(hits => {
        if (hits.length > 0) {
                    toast.success('We have a picture for you!', {
                        position: 'bottom-right',
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

                if (hits.length === 0) {
                    toast.info('Picture is not found', {
                        position: 'bottom-right',
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  onChangeQuery = query => {
    this.setState({
      searchQuery: query.trim(),
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: false,
      modalImg: '',
    });
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      modalImg: largeImageURL,
    });

    console.log(this.state.modalImg);
  };

  render() {
    const { images, isLoading, error, showModal, modalImg } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <>
        <Seachbar onSubmit={this.onChangeQuery} />

        {error && <p>Whoops, something went wrong: {error.message}</p>}

        <Container>
          {isLoading && (
            <Loader
              type="Circles"
              color="#3f51b5"
              height={100}
              width={100}
              timeout={3000}
            />
          )}
          {<ImageGallery images={images} onImgClick={this.openModal} />}

          {shouldRenderLoadMoreButton && <Button onClick={this.fetchImg} />}

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt="" />
            </Modal>
          )}
          <ToastContainer />
        </Container>
      </>
    );
  }
}

export default App;
