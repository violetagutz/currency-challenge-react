const Currency = {
  toDollars: (cents) => {
    if (cents) {
      return "$" + (cents/100).toFixed(2).toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
      return "$0";
    }

  }
}

export default Currency;
