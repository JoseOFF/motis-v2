//src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"
//src="supabase-init.js"
// chat.js
import { supabaseCliente } from './supabase-init.js';


const user = JSON.parse(localStorage.getItem("usuario"));
if (!user) {
  window.location.href = "index.html";
}

let selectedUser = null;

// Cargar usuarios
async function loadChatUsers() {
  const { data: users, error } = await supabaseCliente
    .from('usuarios')
    .select('id, nombre_usuario');
    console.log("Usuarios obtenidos:", users); // 👈 esto debe mostrar la lista


  if (error) return console.error('Error al cargar usuarios:', error.message);

  const list = document.getElementById('chatUsersList');
  list.innerHTML = '';

  users
    .filter(u => u.id !== user.id)
    .forEach(u => {
      const btn = document.createElement('button');
      btn.textContent = u.nombre_usuario;
      btn.addEventListener('click', () => openChatWith(u));
      list.appendChild(btn);
    });
}

async function openChatWith(u) {
  selectedUser = u;
  document.getElementById('chatWith').textContent = `Conversación con ${u.nombre_usuario}`;
  document.getElementById('chatWindow').style.display = 'block';
  await loadMessages(u.id);
}

async function loadMessages(otherUserId) {
  const { data, error } = await supabaseCliente
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order('created_at', { ascending: true });

  if (error) return console.error('Error al obtener mensajes:', error.message);

  const filtered = data.filter(
    m =>
      (m.sender_id === user.id && m.receiver_id === otherUserId) ||
      (m.sender_id === otherUserId && m.receiver_id === user.id)
  );

  const chatBox = document.getElementById('chatMessages');
  chatBox.innerHTML = '';
  filtered.forEach(msg => {
    const div = document.createElement('div');
    div.textContent = `${msg.sender_id === user.id ? 'Tú' : selectedUser.nombre_usuario}: ${msg.content}`;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enviar mensaje
function setupMessageSending() {
  const sendBtn = document.getElementById('sendMessageBtn');
  const input = document.getElementById('chatInput');

  sendBtn.addEventListener('click', async () => {
    const content = input.value.trim();
    if (!content || !selectedUser) return;
    console.log('Enviando mensaje de:', user.id, 'a:', selectedUser.id);


    const { error } = await supabaseCliente.from('messages').insert([{
      sender_id: user.id,
      receiver_id: selectedUser.id,
      content
    }]);

    console.log('User ID:', user.id);
console.log('Selected User ID:', selectedUser.id);


    if (error) {
      console.error('Error al enviar mensaje:', error.message);
    } else {
      input.value = '';
      await loadMessages(selectedUser.id);
    }
  });
}

// Inicializar chat
export function iniciarChat() {
      console.log("Iniciando chat..."); // 👈 log para verificar

  loadChatUsers();
  setupMessageSending();
}
