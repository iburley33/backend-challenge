const Organization = require("../models/Organization");
const captureQuery = require("../utils/captureQuery");

const orgController = {
  //creates a new Organization
  async createOrg(req, res) {
    try {
      const { name, addresses } = req.body;
      const newOrg = await Organization.create({
        name: name,
        addresses: addresses,
      });

      res.json({ data: newOrg });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, error });
    }
  },
  //gets all Organizations in db
  async getOrgs(req, res) {
    try {
      const orgData = await Organization.find();

      res.json(orgData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, error });
    }
  },
  //takes in queries and returns an object containing any documents that contain all of the provided queries
  async matchAllQueries(req, res) {
    try {
      const foundOrg = await Organization.findById(req.params.orgId);
      //utilize the captureQuery method imported from utils to give us an array of all of the passed in queries
      const queries = captureQuery(req.query);
      //check to see if queries are provided
      if (queries.length > 0) {
        //if we have queries start building pipeline
        const pipeline = [
          //find the document with the matching organization id
          {
            $match: {
              _id: foundOrg._id,
            },
          },
          //unwind addresses to flatten the array before searching through addresses.
          {
            $unwind: "$addresses",
          },
          //search the flattened array for any documents that include ALL queries passed in.
          {
            $match: {
              $and: queries,
            },
          },
        ];
        // pass the pipeline into the aggregate method and return the results as res.json in a data object.
        const result = await Organization.aggregate(pipeline);
        res.json({ data: result });
      } else {
        res.send({ message: "No search terms received." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, error });
    }
  },
  //takes in queries and returns an object containing all documents that contain a field that matches any of the queries
  async matchAnyQueries(req, res) {
    try {
      const foundOrg = await Organization.findById(req.params.orgId);
      const queries = captureQuery(req.query);
      if (queries.length > 0) {
        const pipeline = [
          {
            $match: {
              _id: foundOrg._id,
            },
          },
          {
            $unwind: "$addresses",
          },
          //all steps in this function are the same as above except we are using the $or operator
          //to include all documents that have at least 1 query allowing for a broader search.
          {
            $match: {
              $or: queries,
            },
          },
        ];
        const result = await Organization.aggregate(pipeline);
        res.json({ data: result });
      } else {
        res.send({ message: "No search terms received." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, error });
    }
  },
  //takes a passed in ID and returns matching Organization
  async getSingleOrg(req, res) {
    try {
      const orgData = await Organization.findById(req.params.orgId);

      res.json(orgData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, error });
    }
  },
  //takes a passed in ID and updates to new values
  async updateOrg(req, res) {
    try {
      const orgId = req.params.orgId;
      const updateData = req.body;

      const existingOrg = await Organization.findById(orgId);
      if (!existingOrg) {
        return res.status(404).send("Organization not found with the given ID");
      }

      const updatedOrg = await Organization.findByIdAndUpdate(
        orgId,
        updateData,
        { new: true }
      );

      if (!updatedOrg) {
        return res.status(500).send("Failed to update the organization");
      }

      res.status(200).json(updatedOrg);
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ message: error.message, error });
    }
  },
  //takes a passedin ID and deletes the associated organization
  async deleteOrg(req, res) {
    try {
      const orgId = req.params.orgId;

      const existingOrg = await Organization.findById(orgId);
      if (!existingOrg) {
        return res.status(404).send("Organization not found with the given ID");
      }

      const deletedOrg = await Organization.findByIdAndDelete(orgId);

      if (!deletedOrg) {
        return res.status(500).send("Failed to delete the organization");
      }

      res
        .status(200)
        .json({ message: "Organization deleted successfully", deletedOrg });
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ message: error.message, error });
    }
  },
};

module.exports = orgController;
