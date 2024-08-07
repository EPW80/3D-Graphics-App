document.addEventListener('DOMContentLoaded', () => {
  const fetchData = async () => {
    try {
      const response = await fetch('/shape-data');
      const shapesData = await response.json();
      updateShapes(shapesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateShapes = (shapesData) => {
    shapesData.forEach(data => {
      let shape = window.sceneModel.getShapeById(data.id);
      if (!shape) {
        // Add new shape if it doesn't exist
        window.sceneModel.addShape(data.id, data.type, data.x, data.y, data.z, data.color);
        shape = window.sceneModel.getShapeById(data.id);
      }
      if (shape) {
        shape.material.color.setHex(data.color);
        shape.position.set(data.x, data.y, data.z);
        shape.rotation.set(data.rotationX, data.rotationY, data.rotationZ);
        shape.scale.set(data.scaleX, data.scaleY, data.scaleZ);
      }
    });
  };

  // Fetch data from the server every 3 seconds
  setInterval(fetchData, 3000);
  fetchData(); // Initial fetch
});
