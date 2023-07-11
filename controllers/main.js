//tạo HTML cho nav-link
function renderNavLinks(navPills) {
  const navMenu = document.getElementById('nav-pills-menu');
  //thiết lập HTML cho mỗi nav-link
  navPills.forEach((navPill, index) => {
    const listItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.textContent = navPill.showName;
    listItem.classList.add('nav-item');
    navLink.classList.add('nav-link');
    listItem.appendChild(navLink);
    navMenu.appendChild(listItem);
    //tạo thuộc tính bootstrap để trigger nav-pill
    navLink.setAttribute('id', `nav-${navPill.type}-tab`);
    navLink.setAttribute('href', `#${navPill.type}`);
    navLink.setAttribute('data-toggle', 'pill');
    navLink.setAttribute('role', 'tab');
    navLink.setAttribute('aria-controls', navPill.type);
    navLink.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
  });
}

//tạo HTML cho tab-pane / item
function renderItems(products) {
  const tabContent = document.getElementById('pills-tabContent');
  products.forEach(product => {
    const tabPane = document.createElement('div');
    const itemsZone = document.createElement('div');
    //tạo thuộc tính bootstrap để trigger nav-pill
    tabPane.classList.add('tab-pane');
    tabPane.classList.add('fade');
    itemsZone.classList.add('items-zone');
    tabPane.setAttribute('id', product.type);
    tabPane.setAttribute('role', 'tabpanel');
    //thiết lập HTML / button event cho mỗi item
    product.items.forEach(item => {
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('item');
      const img = document.createElement('img');
      img.src = item.imgSrc_jpg;
      const title = document.createElement('h4');
      title.textContent = item.name;
      //tạo nút thử đồ và đặt sự kiện
      const button = document.createElement('button');
      button.classList.add('thudo');
      button.textContent = 'Thử Đồ';
      button.addEventListener('click', () => {
        //DOM tới các ảnh cần thay đổi source (ID ảnh cẩn thay đổi = {type} + "-img")
        const imgElement = document.getElementById(`${product.type}-img`);
        if (imgElement) {
          imgElement.src = item.imgSrc_png;
        }
      });
      //gắn HTML vào item
      itemContainer.appendChild(img);
      itemContainer.appendChild(title);
      itemContainer.appendChild(button);
      itemsZone.appendChild(itemContainer);
    });
    //gắn HTML vào tab-pane/items-zone
    tabPane.appendChild(itemsZone);
    tabContent.appendChild(tabPane);
  });
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
  .catch(error => {
    console.error(error);
  });

