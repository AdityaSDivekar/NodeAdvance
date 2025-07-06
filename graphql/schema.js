
const graphql = require('graphql');

 
const { GraphQLObjectType, GraphQLString,
      GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

 
//Schema defines data on the Graph like object types(book type), the relation between
//these object types and describes how they can reach into the graph to interact with
//the data to retrieve or mutate the data  

 
var fakeBookDatabase = [
   { name:"Book 1", pages:432 , id:1},
   { name: "Book 2", pages: 32, id: 2},
   { name: "Book 3", pages: 532, id: 3 }
]

 
const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
       id: { type: GraphQLID  },
       name: { type: GraphQLString },
       pages: { type: GraphQLInt }
   })
});

 
//RootQuery describes how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
       book: {
           type: BookType,
           //argument passed by the user while making the query
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               //Here we define how to get data from a database source

 
               //this will return the book with id passed in argument by the user
               return fakeBookDatabase.find((item) => { return item.id == args.id});
           }
       }
   }
});
 
//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use it when they are making requests.
module.exports = new GraphQLSchema({
   query: RootQuery
});





// updated graphql/schema.js

const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/Author');

const {
   GraphQLObjectType, GraphQLString,
   GraphQLID, GraphQLInt,GraphQLSchema,
   GraphQLList,GraphQLNonNull
} = graphql;


//Schema defines data on the Graph like object types(book type), the relation between
//these object types and describes how they can reach into the graph to interact with
//the data to retrieve or mutate the data  


const BookType = new GraphQLObjectType({
   name: 'Book',
   //We are wrapping fields in the function as we don’t want to execute this until
   //everything is inilized. For example below code will throw an error AuthorType not
   //found if not wrapped in a function
   fields: () => ({
       id: { type: GraphQLID  },
       name: { type: GraphQLString },
       pages: { type: GraphQLInt },
       author: {
       type: AuthorType,
       resolve(parent, args) {
           return Author.findById(parent.authorID);
       }
   }
   })
});



const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       age: { type: GraphQLInt },
       book:{
           type: new GraphQLList(BookType),
           resolve(parent,args){
               return Book.find({ authorID: parent.id });
           }
       }
   })
})



//RootQuery describes how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular
//book or get a particular author.
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
       book: {
           type: BookType,
           //argument passed by the user while making the query
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               //Here we define how to get data from a database source



               //this will return the book with id passed in argument
               //by the user
               return Book.findById(args.id);
           }
       },
       books:{
           type: new GraphQLList(BookType),
           resolve(parent, args) {
               return Book.find({});
           }
       },
       author:{
           type: AuthorType,
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               return Author.findById(args.id);
           }
       },
       authors:{
           type: new GraphQLList(AuthorType),
           resolve(parent, args) {
               return Author.find({});
           }
       }
   }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use it when they are making requestsuntil.
module.exports = new GraphQLSchema({
   query: RootQuery
});