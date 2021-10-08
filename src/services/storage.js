const storage = window.localStorage;

export const localStorage = {
  retrieve: name => JSON.parse(storage.getItem(name)),
  save: (name, data) => storage.setItem(name, JSON.stringify(data)),
  remove: name => storage.removeItem(name),
  datedSave: durationInMinutes => (name, data) => {
    const now = new Date(Date.now());
    localStorage.save(name, {
      ...data,
      createdAt: now.toISOString(),
      expiresIn: new Date(now.getTime() + durationInMinutes * 60000),
    });
  },
};
