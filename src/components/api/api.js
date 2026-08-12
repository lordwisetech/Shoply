function checkFetch(response,message){
  if(!response.ok){
    throw new Error(message)
  }
}

export async function fetchAllproducts(skip, limit) {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("failed to fetch products");
  }

  return response.json();
}


export async function fetchOneproducts (id){
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    if(!response.ok){
        throw new Error("failed to fetch products")

    }
    return response.json();
}

export async function fetchSearchProducts (search){
  const response = await fetch(`https://dummyjson.com/products/search?q=${search}`);
  if(!response.ok){
    throw new Error("failed To fetch");
  }
  return response.json()
}

export async function fetchProductCartegory (){
  const response = await fetch(`https://dummyjson.com/products/categories`);
  checkFetch(response,"failed to fetch  Category");
  return response.json();
}

export async function fetchProductsByCategory(category) {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );

  checkFetch(response, "Failed to fetch category products");

  return response.json();
}

export async function fetchProducts (){
  const respose = await fetch(`https://dummyjson.com/products?limit=100`);
  if(!respose.ok){    throw new Error("failed to fetch products");  
  }
  return respose.json();
}