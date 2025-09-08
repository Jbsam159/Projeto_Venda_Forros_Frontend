export const sendOrderWhatsApp = (order, adminNumber = "61996364810") => {
  // monta a mensagem
  let message = `🛒 *Novo Pedido #${order.id}*\n\n`;

  // dados do cliente
  if (order.User) {
    message += `🙍 Cliente: ${order.User.name}\n`;
    if (order.User.phone) message += `📱 Telefone: ${order.User.phone}\n`;
    if (order.User.email) message += `📧 Email: ${order.User.email}\n`;
    message += "\n";
  }

  // dados do pedido
  message += `📌 Status: ${order.status}\n`;
  message += `💰 Total: R$ ${order.total}\n\n`;

  // itens do pedido
  if (order.OrderItems && order.OrderItems.length > 0) {
    message += `📦 Itens:\n`;
    order.OrderItems.forEach((item) => {
      message += `- ${item.Product?.name || "Produto"} ${item.Product.description} (${item.quantity}x) - R$ ${item.price}\n`;
    });
  }

  // encode da mensagem para URL
  const encodedMessage = encodeURIComponent(message);

  // abre WhatsApp Web/App
  window.open(`https://wa.me/${adminNumber}?text=${encodedMessage}`, "_blank");
};
