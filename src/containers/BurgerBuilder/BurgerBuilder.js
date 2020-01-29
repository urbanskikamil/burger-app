import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};


class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum,el) => sum + el, 0)
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount +1;
    const updatedIngrdients = {
      ...this.state.ingredients
    }
    updatedIngrdients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngrdients})

    this.updatePurchaseState(updatedIngrdients);
  }
  removeIngredientHandler = (type) => {
    if(this.state.ingredients[type] === 0) return;
    else { 
      const updatedIngrdients = {
        ...this.state.ingredients
      }
      updatedIngrdients[type] = this.state.ingredients[type] -1;
      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({totalPrice: newPrice, ingredients: updatedIngrdients})
      this.updatePurchaseState(updatedIngrdients);
    }
  }

  purchaseHandler = () => { this.setState({purchasing: true}) }

  purchaseCancelHandler = () => { this.setState({purchasing: false}) }

  purchaseContinueHandler = () => { alert('You continue!') }


  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    return (
      <Aux>

        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients} 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientDeducted={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder