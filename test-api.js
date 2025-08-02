async function testProductAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/products/1')
    const product = await response.json()
    
    console.log('Product ID:', product.id)
    console.log('Product Name:', product.name)
    console.log('Brand ID:', product.brandId)
    console.log('Brand:', product.brand)
    console.log('Category ID:', product.categoryId)
    console.log('Category:', product.category)
    
  } catch (error) {
    console.error('Error testing API:', error)
  }
}

testProductAPI()
