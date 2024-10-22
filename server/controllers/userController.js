const { userRegisteredMail } = require("../helpers/userRegisteredMail");
const User = require("../model/User");
const Event = require("../model/Event");

const handleNewUser = async (req, res) => {
  console.log(req.file);
  // console.log(req.body);
  const user = req.body;
  const { name, email, phone, event, quantity } = req.body;
  const transactionUrl = req.file.destination + "/" + req.file.filename;

  if ((!name, !email, !phone, !quantity)) {
    console.log("invalid credentials");
    return;
  }
  //sending email to the owner when user buys the ticket
  // userRegisteredMail(user, user.event);

  const result = await User.create({
    name: name,
    email: email,
    phone_number: phone,
    event: event,
    quantity: quantity,
    image: transactionUrl,
  });

  res.json({
    status: "success",
    message: "Registered for the event successfully",
  });
};

// const getUser = async (req, res) => {
//   try {
//     let allUsers = await User.find();
//     let usersWithEventDetails = await Promise.all(
//       allUsers.map(async (user) => {
//         // Assuming you have an 'event' field in the 'users' collection that holds the ObjectId of the associated event
//         let eventDetails = await Event.findOne({ _id: user.event }).lean();

//         // Merge the event details into the user object
//         return { ...user._doc, eventDetails };
//       })
//     );

//     // console.log(usersWithEventDetails);
//     res.status(200).json(usersWithEventDetails);
//   } catch (err) {
//     res.send(err);
//   }
// };

const getUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || "";
    const eventFilter = req.query.event || "";

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Build the search query based on the provided search parameter
    const searchFilter = searchQuery
      ? { name: { $regex: new RegExp(searchQuery, "i") } } // Perform a case-insensitive search
      : {};

    // Build the event filter query
    const eventFilterQuery = eventFilter ? { event: eventFilter } : {};

    // Combine the search and event filter queries
    const combinedFilter = { ...searchFilter, ...eventFilterQuery };

    // Sort the data in descending order based on the createdAt field (or any other date field you have)
    const users = await User.find(combinedFilter)
      .sort({ createdAt: -1 }) // Use -1 for descending order, 1 for ascending order
      .skip(skip)
      .limit(limit);

    const totalCount = await User.countDocuments(combinedFilter);
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch a batch of users based on the pagination parameters
    // let users = await User.find()
    //   .sort({ createdAt: -1 })
    //   .skip(skip)
    //   .limit(limit);

    // Fetch event details for each user using a separate query
    let usersWithEventDetails = await Promise.all(
      users?.map(async (user) => {
        // Assuming you have an 'event' field in the 'users' collection that holds the ObjectId of the associated event
        let eventDetails = await Event.findOne({ _id: user.event }).lean();

        // Merge the event details into the user object
        return { ...user._doc, eventDetails };
      })
    );

    res.status(200).json({
      users: usersWithEventDetails,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

// const getUser = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     // Calculate the number of documents to skip
//     const skip = (page - 1) * limit;

//     // Sort the data in descending order based on the createdAt field (or any other date field you have)
//     const users = await User.find()
//       .sort({ createdAt: -1 }) // Use -1 for descending order, 1 for ascending order
//       .skip(skip)
//       .limit(limit);

//     const totalCount = await User.countDocuments();
//     const totalPages = Math.ceil(totalCount / limit);

//     res.status(200).json({
//       users,
//       currentPage: page,
//       totalPages,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching users", error: err });
//   }
// };

module.exports = { handleNewUser, getUser };
