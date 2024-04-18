from transformers import AutoModelForSequenceClassification, CamembertTokenizer
import torch
import numpy as np
from ..utils.database import get_neo4j

async def predict_class(model_path, user_id):
    # Query to retrieve user department
    neo4j = get_neo4j()
    user_params = {"user_id": user_id}
    user_query = f"""MATCH (userNode:User) WHERE userNode.UserID = $user_id RETURN userNode.Department AS department"""
    result = await neo4j.query(user_query, user_params)
    input_text = result['department']

    # Input user department to the model to predict activities
    tokenizer = CamembertTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    model.eval()
    inputs = tokenizer(input_text, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    probabilities = torch.softmax(outputs.logits, dim=1)
    class_probabilities = probabilities.numpy()
    class_array = class_probabilities[0]
    sorted_classes = np.argsort(class_array)[::-1]

    return sorted_classes