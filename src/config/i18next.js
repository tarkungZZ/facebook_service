import i18n from "i18next";

i18n.fallbacks = false;
i18n.translations = { en, th };
i18n.locale = "th";

const th = {
  username: "ชื่อผู้ใช้",
  password: "รหัสผ่าน",
  confirm: "ยืนยัน",
  user: "ผู้ใช้",
  manage_facebook: "จัดการ facebook",
  id: "รหัส",
  email: "อีเมล",
  facebook_name: "ชื่อเฟสบุ๊ค",
  email_password: "รหัสผ่านอีเมล",
  facebook_password: "รหัสผ่านเฟสบุ๊ค",
  manage: "จัดการ",
  bot: "บอท",
  edit: "แก้ไข",
  delete: "ลบ",
  edit_config: "แก้ไขการตั้งค่า",
  delay: "ดีเลย์",
  manage_delay_system: "จัดกาดีเลย์ระบบ",
  min_delay: "ดีเลย์น้อยสุด",
  max_delay: "ดีเลย์สูงสุด",
  manage_post: "จัดการโพสต์",
  post: "โพสต์",
  manage: "จัดการ",
  settings: "ตั้งค่า",
  select_your_language: "เลือกภาษา",
  logout: "ออกจากระบบ",
};

const en = {
  username: "Username",
  password: "Password",
  confirm: "Confirm",
  user: "User",
  manage_facebook: "Manage Facebook",
  id: "ID",
  email: "Email",
  facebook_name: "Facebook Name",
  email_password: "Email Password",
  facebook_password: "Facebook Password",
  manage: "Manage",
  bot: "Bot",
  edit: "Edit",
  delete: "Delete",
  edit_config: "Edit Config",
  delay: "Delay",
  manage_delay_system: "Manage Delay System",
  min_delay: " Min Delay",
  max_delay: "Max Delay",
  manage_post: "Manage Post",
  post: "Post",
  manage: "Manage",
  settings: "Settings",
  select_your_language: "Select Your Language",
  logout: "Logout",
};

export { en, th };
