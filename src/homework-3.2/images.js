import React, { Component } from "react";
import { Oval } from "react-loader-spinner";
import styles from "./styles.module.css";
import * as test from "./basiclightbox/dist/basicLightbox.min.css";
const basicLightbox = require("basiclightbox");

class SearchBar extends Component {
  state = {
    search: "",
  };
  handleInput = ({ target }) => {
    this.setState({ search: target.value });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { search } = this.props;
    const dataToSearchFor = this.state.search;
    search(dataToSearchFor);
  };
  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm}>
          <button
            type="submit"
            onClick={this.handleSubmit}
            className={styles.SearchForm_button}
          >
            <span className={styles.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

class ImageGallery extends Component {
  render() {
    const { images, showBigImage } = this.props;
    return (
      <ul className={styles.ImageGallery}>
        {images.map((image) => (
          <ImageGalleryItem
            image={image}
            id={image.id}
            showBigImage={showBigImage}
          />
        ))}
      </ul>
    );
  }
}

class ImageGalleryItem extends Component {
  render() {
    const { image, id, showBigImage } = this.props;
    return (
      <li key={id} className={styles.ImageGalleryItem}>
        <img
          onClick={() => showBigImage(image)}
          className={styles.ImageGalleryItem_image}
          src={image.smallImage}
          alt=""
        />
      </li>
    );
  }
}

class Button extends Component {
  render() {
    const { loadImages } = this.props;
    return (
      <div className={styles.centerInnerElement}>
        <button className={styles.Button} onClick={loadImages}>
          Load More
        </button>
      </div>
    );
  }
}

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    search: "",
  };

  loadImages = (data) => {
    this.setState({ images: data, page: 1 });
  };

  addImages = (data) => {
    const images = [...this.state.images];
    images.push(...data);
    this.setState({ images, page: this.state.page + 1 });
  };

  getFetchedData = (search) => {
    return fetch(
      `https://pixabay.com/api/?q=${search.split(" ").join("-")}&page=${
        this.state.page
      }&key=33532854-e632c90cde5486976c8ef79b6&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => {
        this.setState({ isLoading: false });
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        const images = data.hits.map((image) => ({
          id: image.id,
          smallImage: image.webformatURL,
          bigImage: image.largeImageURL,
        }));
        return images;
      });
  };

  loadMore = async () => {
    await this.setState({ isLoading: true, page: this.state.page + 1 });
    this.getFetchedData(this.state.search).then((images) =>
      this.addImages(images)
    );
  };

  search = (search) => {
    if (search === this.state.search) return;
    this.setState({ isLoading: true, search });
    this.getFetchedData(search).then((images) => this.loadImages(images));
  };

  showBigImage = (image) => {
    const instance = basicLightbox.create(
      `<img src=${image.bigImage}>`
    );
    instance.show();
  };

  render() {
    return (
      <>
        <SearchBar search={this.search} />
        <ImageGallery
          images={this.state.images}
          showBigImage={this.showBigImage}
        />
        {this.state.images.length ? (
          <Button loadImages={this.loadMore} />
        ) : null}

        {this.state.isLoading && (
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass={styles.Overlay}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
      </>
    );
  }
}

export default App;
