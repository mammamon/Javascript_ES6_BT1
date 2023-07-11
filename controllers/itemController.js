function displayNavLinks(navPills) {
    const navMenu = document.getElementById('nav-pills-menu');

    navPills.forEach((navPill, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('nav-item');

        const navLink = document.createElement('a');
        navLink.classList.add('nav-link');
        navLink.setAttribute('id', `nav-${navPill.type}-tab`);
        navLink.setAttribute('data-toggle', 'pill');
        navLink.setAttribute('href', `#${navPill.type}`);
        navLink.setAttribute('role', 'tab');
        navLink.setAttribute('aria-controls', navPill.type);
        navLink.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        navLink.textContent = navPill.showName;
        listItem.appendChild(navLink);
        navMenu.appendChild(listItem);
    });
}

function displayItems(products) {
    const tabContent = document.getElementById('pills-tabContent');
  
    products.forEach(product => {
      const tabPane = document.createElement('div');
      tabPane.classList.add('tab-pane');
      tabPane.classList.add('fade');
      tabPane.setAttribute('id', product.type);
      tabPane.setAttribute('role', 'tabpanel');
      tabPane.setAttribute('aria-labelledby', `nav-${product.type}-tab`);
  
      const itemsZone = document.createElement('div');
      itemsZone.classList.add('items-zone');
  
      product.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
  
        const img = document.createElement('img');
        img.src = item.imgSrc_jpg; // Use imgSrc_jpg for items inside nav pill
  
        const heading = document.createElement('h4');
        heading.textContent = item.name;
  
        const button = document.createElement('button');
        button.classList.add('thudo');
        button.textContent = 'Thử đồ';
  
        itemDiv.appendChild(img);
        itemDiv.appendChild(heading);
        itemDiv.appendChild(button);
  
        itemsZone.appendChild(itemDiv);
      });
  
      tabPane.appendChild(itemsZone);
      tabContent.appendChild(tabPane);
    });
  
    const thudoButtons = document.querySelectorAll('.thudo');
    thudoButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productType = button.parentNode.parentNode.parentNode.id;
        const imgElement = document.getElementById(`${productType}-img`);
        if (imgElement) {
          const product = products.find(product => product.type === productType);
          if (product) {
            const activeTabPane = document.querySelector('.tab-pane.active');
            const item = product.items.find(item => item.type === activeTabPane.id);
            if (item) {
              const imgDress = item.imgSrc_png; // Use imgSrc_png for the imgDress value
              imgElement.src = imgDress;
            }
          }
        }
      });
    });
  }
  
  // Fetch JSON data and generate navPills and products
  axios
    .get('../data/Data.json')
    .then(response => {
      const data = response.data;
      const navPills = data.navPills.map(navPill => new NavPill(navPill.showName, navPill.type));
  
      // Generate Products with respective items
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
  
      displayNavLinks(navPills);
      displayItems(products);
    })
    .catch(error => {
      console.error('Error fetching JSON data:', error);
    });
  