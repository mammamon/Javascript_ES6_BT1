const Dressing = (item, BsPill, imgID) => {
    const BSPillContainer = document.getElementById(BsPill);
    item.forEach((itemSrc) => {
      //tạo HTML ô chứa sản phẩm
      const itemContainer = document.createElement('div');
      const image = document.createElement('img');
      const title = document.createElement('h4');
      const button = document.createElement('button');
      BSPillContainer.appendChild(itemContainer);
      itemContainer.classList.add('item');
      button.textContent = 'Thử đồ';
      itemContainer.appendChild(image);
      itemContainer.appendChild(title);
      itemContainer.appendChild(button);
      //lấy tên hình ảnh dựa trên đường link
      image.src = itemSrc;
      const imageName = itemSrc.split('/').pop();
      //tạo đường dẫn chứa ảnh mặc đồ khi bấm nút thử đồ
      button.addEventListener('click', () => {
        const imageID = document.getElementById(imgID);
        const imgSrc = itemSrc.replace('_show.jpg', '.png');
        imageID.src = imgSrc;
      });
      //tạo tiêu đề sản phẩm dựa trên tên hình ảnh
      let titleText = imageName.split('.')[0];
      if (titleText.endsWith('_show')) {
        titleText = titleText.slice(0, -5);
      }
      title.textContent = formatTitle(titleText);
    });
  };
  
  // format tiêu đề sản phẩm
  const formatTitle = (titleText) => {
    if (titleText.endsWith('_show')) {
        titleText = titleText.slice(0, -5);
    }
    return titleText
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  };
  
  //bóc ra xài
  Dressing(itemData.ao, 'ao-items-zone', 'ao-img');
  Dressing(itemData.quan, 'quan-items-zone', 'quan-img');
  Dressing(itemData.kieutoc, 'kieutoc-items-zone', 'kieutoc-img');
  Dressing(itemData.tuixach, 'tuixach-items-zone', 'handbag');
  Dressing(itemData.giaydep, 'giaydep-items-zone', 'giaydep-img');
  Dressing(itemData.daychuyen, 'daychuyen-items-zone', 'daychuyen-img');
  Dressing(itemData.nen, 'nen-items-zone', 'nen-img');