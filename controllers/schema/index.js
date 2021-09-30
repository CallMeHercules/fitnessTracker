const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Lift {
            _id: ID!
            name: String!
            weight: Int!
            reps: Int!
            date: String!
            lifter: User!
        }
        type User {
            _id: ID!
            email: String!
            password: String
            bodyweight: Int!
            performedLifts: [Lift!]
        }
        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }
        
        input LiftInput {
            name: String!
            weight: Int!
            reps: Int!
            date: String!
        }
        input UserInput {
            email: String!
            password: String!
            bodyweight: Int!
        }
        
        type RootQuery {
            lifts: [Lift!]!    
            login(email: String!, password: String!): AuthData!
        }
        type RootMutation {
            createLift(liftInput: LiftInput): Lift
            createUser(userInput: UserInput): User
        }
         schema {
            query: RootQuery
            mutation: RootMutation
        }
        `);