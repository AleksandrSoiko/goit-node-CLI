const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newItem = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  data.push(newItem);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newItem;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
