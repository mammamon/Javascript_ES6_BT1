//tạo HTML cho nav-link
function renderNavLinks(navPills) {
  let content = "";
  navPills.forEach((navPill, index) => {
    content += `
      <li class="nav-item">
        <a class="nav-link ${index === 0 ? 'active' : ''}" id="nav-${navPill.type}-tab" data-toggle="pill" href="#${navPill.type}" role="tab" aria-controls="${navPill.type}" aria-selected="${index === 0 ? 'true' : 'false'}">
          ${navPill.showName}
        </a>
      </li>
    `;
  });
  const navMenu = document.getElementById('nav-pills-menu');
  navMenu.innerHTML = content;
};


//tạo HTML cho tab-pane 
function renderItems(products) {
  const tabContent = document.getElementById('pills-tabContent');
  products.forEach(product => {
    const tabPane = document.createElement('div');
    const itemsZone = document.createElement('div');
    //thêm thuộc tính bootstrap để trigger nav-pill
    tabPane.classList.add('tab-pane');
    tabPane.classList.add('fade');
    itemsZone.classList.add('items-zone');
    tabPane.setAttribute('id', product.type);
    tabPane.setAttribute('role', 'tabpanel');
    //tạo HTML cho item
    const itemsHtml = product.items.map(item => `
      <div class="item">
        <img src="${item.imgSrc_jpg}">
        <h4>${item.name}</h4>
        <button onclick="dressingImg('${product.type}', '${item.imgSrc_png}')">Thử Đồ</button>
      </div>
    `).join('');
    itemsZone.innerHTML = itemsHtml;
    //gắn HTML vào tab-pane/items-zone
    tabPane.appendChild(itemsZone);
    tabContent.appendChild(tabPane);
  });
}

//hiện ảnh mặc đồ
function dressingImg(type, imgSrc) {
  const imgDressing = document.getElementById(`${type}-img`);
  if (imgDressing) {
    imgDressing.src = imgSrc;
  }
}
//lấy dữ liệu từ Data.json
axios
  .get('../data/Data.json')
  .then(response => {
    const data = response.data;
    //tạo và gán dữ liệu các đối tượng nav-pill
    const navPills = data.navPills.map(navPill => new NavPill(navPill.showName, navPill.type));
    //tạo và gán dữ liệu các đối tượng product
    const products = data.navPills.map(navPill => {
      return {
        type: navPill.type,
        items: data.tabPanes
          .filter(tabPane => tabPane.type === navPill.type)
          .map(tabPane => {
            return {
              type: tabPane.type,
              name: tabPane.name,
              imgSrc_jpg: tabPane.imgSrc_jpg,
              imgSrc_png: tabPane.imgSrc_png
            };
          })
      };
    });
    //render ra tất cả nav-pill (html: nav-item/nav-link)
    renderNavLinks(navPills);
    //render ra tất cả product (html: tab-pane/items-zone/item)
    renderItems(products);
  })

document.querySelector('.dress-reset').addEventListener('click', () => {
  const dressImages = document.querySelectorAll('.dress img');
  dressImages.forEach((img) => {
    if (img.id !== 'background-img') {
      img.src = '';
    }
  });
  const bikiniTop = document.querySelector('.bikinitop');
  bikiniTop.style.backgroundImage = 'none';
  const bikiniBottom = document.querySelector('.bikinibottom');
  bikiniBottom.style.backgroundImage = 'none';
});
