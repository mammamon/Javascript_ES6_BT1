const itemZone = (items, zoneID, targetID) => {
    const itemsContainer = document.getElementById(zoneID);
    items.forEach((itemSrc) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
  
      const image = document.createElement('img');
      image.src = itemSrc;
      image.alt = 'Product Image';
      image.classList.add('product-image');
  
      const title = document.createElement('h4');
      title.classList.add('product-title');
      const imageName = itemSrc.split('/').pop();
      const titleText = imageName.split('.')[0];
      title.textContent = formatTitle(titleText);
  
      const button = document.createElement('button');
      button.classList.add('thudo-button');
      button.textContent = 'Thử đồ';
  
      button.addEventListener('click', () => {
        const targetImage = document.getElementById(targetID);
        const imgSrc = itemSrc.replace('_show.jpg', '.png');
        targetImage.src = imgSrc;
      });
  
      itemDiv.appendChild(image);
      itemDiv.appendChild(title);
      itemDiv.appendChild(button);
      itemsContainer.appendChild(itemDiv);
    });
  };
  
  const formatTitle = (titleText) => {
    return titleText
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Usage
  itemZone(itemData.ao, 'ao-items-zone', 'ao-img');
  itemZone(itemData.quan, 'quan-items-zone', 'quan-img');
  itemZone(itemData.kieutoc, 'kieutoc-items-zone', 'kieutoc-img');
  itemZone(itemData.tuixach, 'tuixach-items-zone', 'handbag');
  itemZone(itemData.giaydep, 'giaydep-items-zone', 'giaydep-img');
  itemZone(itemData.daychuyen, 'daychuyen-items-zone', 'daychuyen-img');
  itemZone(itemData.nen, 'nen-items-zone', 'nen-img');
  