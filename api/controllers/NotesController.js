/**
 * NotesController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list:function(req, res){
       // res.view('list');
       Notes.find({}).exec(function(err,notes){
           if(err){
               res.send(500, {error: "DB Error"});
           }
           res.view("list",{notes:notes});

           });
       },
    add:function(req, res){
        res.view("add");
    },
    create:function(req, res){
        var title = req.body.title;
        var body = req.body.body;

        Notes.create({title:title, body:body}).exec(function(err){
            if(err){
                res.send(500, {error: "DB Error"});
            }

            res.redirect("/notes/list");
        });
    },
    delete: function(req,res){
        Notes.destroy({id:req.params.id}).exec(function(err){
            if(err){
                res.send(500, {error:"DB Error"});
            }

            res.redirect("/notes/list");
        });
        return false;   
    },
    edit: function(req,res){
        Notes.findOne({id:req.params.id}).exec(function(err,notes){
            if(err){
                res.send(500, {error:"DB Error"});
            }

            res.view("edit",{notes:notes});
        });
    },
    update: function(req,res){
        var title = req.body.title;
        var body = req.body.body;

        Notes.create({id: req.params.id},{title:title, body:body}).exec(function(err){
            if(err){
                res.send(500, {error: "DB Error"});
            }

            res.redirect("/notes/list");
        });
        return false;
    },
    view: function(req,res){
        Notes.findOne({id:req.params.id}).exec(function(err,notes){
            if(err){
                res.send(500, {error:"DB Error"});
            }

            res.view("view",{notes:notes});
        });
    },
};

