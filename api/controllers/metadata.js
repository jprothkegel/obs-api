var title = '';
var description = '';
var subject = '';
var language = '';
var rights = '';
var license = '';
var seriesid = '';
var presenter = '';
var contributor = '';

exports.set_metadata = (req, res, next) => {
    title = req.body.metadata.title
    description = req.body.metadata.description
    subject = req.body.metadata.subject
    language = req.body.metadata.language
    rights = req.body.metadata.rights
    license = req.body.metadata.license
    seriesid = req.body.metadata.seriesid
    presenter = req.body.metadata.presenter
    contributor = req.body.metadata.contributor
    return res.status(200).json({
        message: 'Data received'
    })
}

exports.get_metadata = (req, res, next) => {
    return res.status(200).json({
        title: title,
        description: description,
        subject: subject,
        language: language, 
        rights: rights,
        license: license,
        seriesid: seriesid,
        presenter: presenter,
        contributor: contributor
    })
}

exports.set_empty_metadata = (req, res, next) => {
    title = ''
    description = ''
    subject = ''
    language = ''
    rights = ''
    license = ''
    seriesid = ''
    presenter = ''
    contributor = ''
    return res.status(200).json({
        message: 'Data updated'
    })
}