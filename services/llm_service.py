import openai
from config import config
import json

class LLMService:
    """
    Service to handle interactions with the LLM API
    """
    
    def __init__(self):
        """
        Initialize the LLM service with configuration
        """
        openai.api_key = config['OPENAI_API_KEY']
        self.model_name = config['MODEL_NAME']
        self.max_tokens = config['MAX_TOKENS']
        self.temperature = config['TEMPERATURE']
    
    def generate_recommendations(self, user_preferences, browsing_history, all_products):
        """
        Generate personalized product recommendations based on user preferences and browsing history
        
        Parameters:
        - user_preferences (dict): User's stated preferences
        - browsing_history (list): List of product IDs the user has viewed
        - all_products (list): Full product catalog
        
        Returns:
        - dict: Recommended products with explanations
        """
        # TODO: Implement LLM-based recommendation logic
        # This is where your prompt engineering expertise will be evaluated
        
        # Get browsed products details
        browsed_products = []
        for product_id in browsing_history:
            for product in all_products:
                if product["id"] == product_id:
                    browsed_products.append(product)
                    break
        
        # Create a prompt for the LLM
        # IMPLEMENT YOUR PROMPT ENGINEERING HERE
        prompt = self._create_recommendation_prompt(user_preferences, browsed_products, all_products)
        
        # Call the LLM API
        try:
            response = openai.ChatCompletion.create(
                model=self.model_name,
                messages=[
                    {"role": "system", "content": "You are a helpful eCommerce product recommendation assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            # Parse the LLM response to extract recommendations
            # IMPLEMENT YOUR RESPONSE PARSING LOGIC HERE
            recommendations = self._parse_recommendation_response(response.choices[0].message.content, all_products)           
            return recommendations
            
        except Exception as e:
            # Handle any errors from the LLM API
            print(f"Error calling LLM API: {str(e)}")
            raise Exception(f"Failed to generate recommendations: {str(e)}")
    
    def _create_recommendation_prompt(self, user_preferences, browsed_products, all_products):
        candidate_products = all_products[:20]  # Limit for token usage

        prompt = """
    You are an intelligent eCommerce recommendation engine.

    Given the user's preferences and their browsing history, your job is to recommend exactly 5 products from the candidate list below.

    Respond ONLY in a valid JSON array. Each recommendation must include:
    - "product_id": string
    - "explanation": string
    - "score": number (confidence score from 1 to 10)

    DO NOT include any extra text before or after the JSON.

    User Preferences:
    """ + json.dumps(user_preferences, indent=2)

        prompt += "\n\nBrowsing History:\n"
        for p in browsed_products:
            prompt += f"- {p['name']} ({p['category']}, ${p['price']}, Brand: {p['brand']})\n"

        prompt += "\nCandidate Products:\n"
        for p in candidate_products:
            prompt += f"- ID: {p['id']}, Name: {p['name']}, Category: {p['category']}, Price: ${p['price']}, Brand: {p['brand']}\n"

        prompt += "\nREMEMBER: Choose only from the above product list and follow the JSON format exactly.\n"

        return prompt


    
    def _parse_recommendation_response(self, llm_response, all_products):
        try:
            import json

            print("\n== RAW LLM RESPONSE ==\n", llm_response)  # Debugging output

            # Try to extract JSON block
            start_idx = llm_response.find('[')
            end_idx = llm_response.rfind(']') + 1

            if start_idx == -1 or end_idx == 0:
                return {
                    "recommendations": [],
                    "error": "Could not find JSON array in LLM response"
                }

            json_str = llm_response[start_idx:end_idx]
            rec_data = json.loads(json_str)

            # Enrich product info
            recommendations = []
            for rec in rec_data:
                product_id = rec.get('product_id')
                product_details = next((p for p in all_products if p['id'] == product_id), None)

                if product_details:
                    recommendations.append({
                        "product": product_details,
                        "explanation": rec.get('explanation', ''),
                        "confidence_score": rec.get('score', 5)
                    })

            return {
                "recommendations": recommendations,
                "count": len(recommendations)
            }

        except Exception as e:
            print("Parsing failed:", str(e))
            return {
                "recommendations": [],
                "error": str(e)
            }

