exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const products = [
    {
      id: 1,
      img: 'img1',
      brand: "essence",
      name: "艾森絲16 hr 持久粉底液 30",
      new_price: "178",
      price: "179"
    },
    {
      id: 2,
      img: 'img2',
      brand: "RIMMEL",
      name: "倫敦芮魅極限長效持久粉底液 (103 柔膚色) 30ml",
      new_price: "425",
      price: "450"
    },
    {
      id: 3,
      img: 'img3',
      brand: "KANEBOITBE媚點",
      name: "防曬保濕礦物粉底液(健康膚色)OC-E1 (25g)",
      new_price: "275",
      price: "280"
    },
    {
      id: 4,
      img: "img4",
      brand: "KATE 凱婷",
      name: "凱婷 零瑕肌密粉底液(亮膚色)00 (30ml)",
      new_price: "500",
      price: "487"
    },
    {
      id: 5,
      img: "img5",
      brand: "L'egere蘭吉兒",
      name: "L’EGERE 玩鎂光水光透潤粉底液 SPF50(#21淺膚色) 40ml",
      new_price: "469",
      price: "299"
    },
    {
      id: 6,
      img: "img6",
      brand: "Bourjois 妙巴黎",
      name: "妙巴黎 果然新肌光粉底液旗艦版#53-自然膚色 (30ml)",
      new_price: "399",
      price: "545"
    },
    {
      id: 7,
      img: "img7",
      brand: "CLINIQUE",
      name: "倩碧 12H完美偽妝粉底液SPF19/PA++#62 ROSE BEIGE(30ml)",
      new_price: "1080",
      price: "1500"
    },
    {
      id: 8,
      img: "img8",
      brand: "MAKE UP FOR EVER",
      name: "拉提保濕粉底液(30ml)_#2",
      new_price: "1529",
      price: "1700"
    },
  ]
  products.forEach(product => {
    console.log(product)
    createPage({
      path: `/ProductDetail/${product.id}`,
      component: require.resolve(`./src/components/ProductDetail/ProductDetail.js`),
      context: { product },
    })
  })
}