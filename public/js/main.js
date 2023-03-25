const deleteButtons = document.querySelectorAll(".del");


deleteButtons.forEach((button) => {
  if (!button.hasListener) {
    button.addEventListener("click", borrarCuenta);
    button.hasListener = true;
  }
});

async function borrarCuenta() {
  const cuentaId = this.parentNode.dataset.id;
  try {
    const response = await fetch("/cuentas/borrarCuenta", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        cuentaId: cuentaId,
      }),
    }); 
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}