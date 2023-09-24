//Adult Pass = price_1NkfZILB0AdTCUhB2gVNjjWR
//Senior Youth Pass = price_1NkfZyLB0AdTCUhB9bfAna0a
//Child Pass = price_1NkfbBLB0AdTCUhBhD0z6G0c

const productsArray = [
    {
        id: "price_1NkfZILB0AdTCUhB2gVNjjWR",
        title: "Adult",
        price: 2.75
    },
    {
        id: "price_1NkfZyLB0AdTCUhB9bfAna0a",
        title: "Senior Youth",
        price: 2.00
    },
    {
        id: "price_1NkfbBLB0AdTCUhBhD0z6G0c",
        title: "Child",
        price: 0
    },
]

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined){
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}


export { productsArray, getProductData };