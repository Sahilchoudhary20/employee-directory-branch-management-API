jest.mock("../config/firebaseConfig", () => {
  const mockCollection = jest.fn(() => {
    return {
      add: jest.fn().mockResolvedValue({ id: "new-doc-id", get: jest.fn().mockResolvedValue({ data: () => ({}) }) }),
      doc: jest.fn((id: string) => ({
        get: jest.fn().mockResolvedValue({ exists: false, id, data: () => null }),
        update: jest.fn().mockResolvedValue(true),
        delete: jest.fn().mockResolvedValue(true)
      })),
      get: jest.fn().mockResolvedValue({ docs: [] }),
      where: jest.fn().mockReturnValue({ get: jest.fn().mockResolvedValue({ docs: [] }) })
    };
  });

  return {
    admin: {
      credential: {
        cert: jest.fn()
      }
    },
    db: {
      collection: mockCollection
    }
  };
});

// Reset mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
