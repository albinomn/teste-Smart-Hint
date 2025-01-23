from flask import Blueprint, jsonify, request
from models.product import Product
from database import db
from werkzeug.utils import secure_filename
from config import Config
from flask_cors import cross_origin

product_blueprint = Blueprint('products', __name__)

@product_blueprint.route('/products', methods=['GET'])
def get_products():
  try:
    products_response = Product.query.all()
    products = [
      {
        "id": product.id,
        "imagem": product.image,
        "nome": product.name,
        "ean": product.ean,
        "preco": product.price,
        "data_cadastro": product.created_at
      }
      for product in products_response
    ]
    return jsonify({"products": products}), 200
  except Exception as e:
    return jsonify({"error": str(e)}), 500
  
@product_blueprint.route('/products', methods=['POST'])
def create_product():
  try:
    name = request.form.get('name')
    ean = request.form.get('ean')
    price = request.form.get('price')
    image = request.files.get('image')

    if not name:
      return jsonify({"error": "missing name property"}), 400
    if not ean:
      return jsonify({"error": "missing ean property"}), 400
    if not image:
      return jsonify({"error": "missing image property"}), 400
    if not price:
        return jsonify({"error": "missing price property"}), 400
    
    filename = secure_filename(image.filename)
    image_path = os.path.join(Config.UPLOAD_FOLDER, filename)
    image.save(image_path)
    new_product = Product(name = name, ean = ean, image = image_path)
    db.session.add(new_product)
    db.session.commit()

    return jsonify({"msg": "new product inserted"}), 201
  except Exception as e:
    return jsonify({"error": str(e)}), 500