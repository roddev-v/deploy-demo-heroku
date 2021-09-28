import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import { addToCart } from "../redux/actions/cart";
import products from "../utils/products.json";

class Product extends React.Component {
  constructor(props) {
    super(props);

    const id = parseInt(props.match.params.productId);
    const categories = Object.values(products);

    for (const category of categories) {
      for (const item of category.items) {
        if (item.id === id) {
          this.state = { product: item };
          break;
        }
      }
      if (this.state?.product !== undefined) {
        break;
      }
    }
  }

  render() {
    const { name, price, currency, image, id } = this.state.product;
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <img
                style={{ width: "100%", height: "400px" }}
                src={this.state.product.image}
              ></img>
            </div>
            <div className="col-8">
              <h2>Description</h2>
              <p>{this.state.product.description}</p>
              <h2>Material</h2>
              <p>{this.state.product.material}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() =>
                  this.props.addProductToCart({
                    product: {
                      id,
                      name,
                      price,
                      currency,
                      image,
                    },
                  })
                }
              >
                Adauga!
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: (product) => dispatch(addToCart(product)),
  };
}

export default connect(null, mapDispatchToProps)(Product);
