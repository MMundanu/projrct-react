module.exports = (res, error, method) => {
    console.error(error);

    return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || `Ups, hubo un error en el método ${method}`
    });
};

