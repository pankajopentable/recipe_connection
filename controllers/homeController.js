var courses = [
    {
        title:"Event Driven Cakes",
        price:32
    },
    {
        title:"Choc Cakes",
        price:20
    },
    {
        title:"Orange Juics",
        price:15
    },
    {
        title:"Event Driven Cakes",
        price:45
    }
];
exports.homePage = (req,res)=>{
    res.render('index');
}
exports.showSignup = (req,res)=>{
    res.render('contact');
}

exports.postSignup = (req,res)=>{
    res.render('thanks')
}

exports.showCourses = (req,res) => {
    res.render("courses",{offerCourses:courses, isLogin:true})
}