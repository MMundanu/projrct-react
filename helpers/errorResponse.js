module.exports = (res, error) => {
    console.log(error);

    return res.status(error.status || 500).json({
        ok: false,
        msg: error || `Upss, hubo un error ${method}` 
    })
}