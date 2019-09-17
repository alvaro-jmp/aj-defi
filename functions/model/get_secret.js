"use strict";

exports.p_get_secret = function (ref_admin_firestore) {
  return ref_admin_firestore.collection('secret').doc('b20b67aa-3593-4836-858b-09f047fb1f82').get({
    source: 'default'
  });
};