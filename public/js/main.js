const deleteButtons = document.querySelectorAll(".del");


deleteButtons.forEach((button) => {
  if (!button.hasListener) {
    button.addEventListener("click", deleteProveedor);
    button.hasListener = true;
  }
});

async function deleteProveedor(e) {
  const proveedorId = e.target.closest("li").dataset.id;

  // Check if proveedorId is defined
  if (!proveedorId) {
    console.error("proveedorId is undefined");
    return;
  }

  try {
    const response = await fetch("settings", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        proveedorIdFromJSFile: proveedorId,
      }),
    });
    // Check if the request is still in progress
    if (response.status === 204 || response.status === 205) {
      return;
    }
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

document.querySelector('#proveedor').addEventListener('click', displayProveedores)

function displayProveedores() {
  
}