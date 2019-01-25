import mOrm from "./mOrm";

// Let's Rock!
async () => {
  const orm = new mOrm();

  try {
    await orm.createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "majdi",
      password: "toumi",
      database: "iLovePragmatic"
    });

    // or:
    // orm.createConnection('postgresql://majdi:toumi@localhost:5432/iLovePragmatic')
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};
