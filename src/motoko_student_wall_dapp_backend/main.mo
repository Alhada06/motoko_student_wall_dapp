import Type "Types";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Hash "mo:base/Hash";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import Bool "mo:base/Bool";

actor {

  type Message = Type.Message;
  type Content = Type.Content;
  type Survey = Type.Survey;
  type Answer = Type.Answer;
  type Profile = Type.Profile;
  //serves as a continuously increasing counter, maintaining a
  //record of the total number of messages posted
  var messageId : Nat = 0;

  var wall = HashMap.HashMap<Nat, Message>(0, Nat.equal, Hash.hash);
  var users = HashMap.HashMap<Principal, Profile>(0, Principal.equal, Principal.hash);

  public shared ({ caller }) func addMyProfile(profile : Profile) : async Result.Result<(), Text> {
    if (not (Principal.isAnonymous(caller))) {
      return #ok(users.put(caller, profile));

    } else {
      return #err("user is anonymous pls login")
    };

  };

  public shared query ({ caller }) func getMyProfile() : async ?Profile{
    return users.get(caller)

  };

  public query func isRegistered(p : Principal) : async Bool {

    switch (users.get(p)) {
      case (null) { false };
      case (?profile) { true }
    };

  };

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!"
  };
  public shared query ({ caller }) func whoami() : async Principal {
    caller
  };

  // Add a new message to the wall
  public shared ({ caller }) func writeMessage(c : Content) : async Nat {
    let msg : Message = { content = c; creator = caller; vote = 0 };
    let mId = messageId;
    wall.put(mId, msg);
    messageId += 1;
    return mId
  };

  // Get a specific message by ID
  public shared query func getMessage(messageId : Nat) : async Result.Result<Message, Text> {
    let res = wall.get(messageId);
    switch (res) {
      case (null) { return #err("Message id not found!") };
      case (?v) { return #ok(v) }
    }
  };

  // Update the content for a specific message by ID
  public shared ({ caller }) func updateMessage(messageId : Nat, c : Content) : async Result.Result<(), Text> {
    let msg = wall.get(messageId);

    switch (msg) {
      case (null) { return #err("the message does not exist!") };
      case (?v) {
        if (Principal.equal(v.creator, caller)) {
          let updateMsg : Message = {
            content = c;
            vote = v.vote;
            creator = v.creator
          };
          ignore wall.replace(messageId, updateMsg);
          return #ok()
        } else {
          return #err("You are not the creator of the message!")
        };

      }
    };

  };

  // Delete a specific message by ID
  public shared ({ caller }) func deleteMessage(messageId : Nat) : async Result.Result<(), Text> {

    let msg = wall.get(messageId);

    switch (msg) {
      case (null) { return #err("the message does not exist!") };
      case (?v) {
        if (Principal.equal(v.creator, caller)) {
          return #ok(wall.delete(messageId))
        } else {
          return #err("You are not the creator of the message!")
        };

      }
    };

    return #err("not implemented")
  };

  // Voting
  public func upVote(messageId : Nat) : async Result.Result<(), Text> {
    let msg = wall.get(messageId);
    switch (msg) {
      case (null) { return #err("The message does not exist!") };
      case (?m) {
        let upvoted : Message = {
          content = m.content;
          vote = m.vote +1;
          creator = m.creator
        };
        return #ok(wall.put(messageId, upvoted))
      }
    }
  };

  public func downVote(messageId : Nat) : async Result.Result<(), Text> {
    let msg = wall.get(messageId);
    switch (msg) {
      case (null) { return #err("The message does not exist!") };
      case (?m) {
        let downvoted : Message = {
          content = m.content;
          vote = m.vote - 1;
          creator = m.creator
        };
        return #ok(wall.put(messageId, downvoted))
      }
    }
  };

  // Get all messages
  public func getAllMessages() : async [Message] {
    return Iter.toArray(wall.vals())
  };

  // Get all messages ordered by votes
  public func getAllMessagesRanked() : async [Message] {
    return Array.reverse(Array.sort<Message>(Iter.toArray(wall.vals()), func(a : Message, b : Message) { Int.compare(a.vote, b.vote) }))
  };

}
