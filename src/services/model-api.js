import axios from "axios";
import { secret } from "../secret";

const apiKey = secret.apiKey; // Assuming secret is correctly imported and apiKey is defined in secret

export const fetchImages = async (
  promptCall,
  seedValue,
  dropDownValue,
  radioValue
) => {
  const options = {
    method: "POST",
    url: "https://api.segmind.com/v1/sdxl1.0-txt2img",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    responseType: "arraybuffer",
    data: JSON.stringify({
      prompt: promptCall,
      seed: seedValue,
      scheduler: dropDownValue,
      num_inference_steps: radioValue,
      negative_prompt: "NONE",
      samples: 1, // Changed to number instead of string
      guidance_scale: 7.5, // Changed to number instead of string
      strength: 1, // Changed to number instead of string
      shape: 512,
    }),
  };

  try {
    const response = await axios.request(options);
    // Convert raw blob as ArrayBuffer to an image blob with MIME type
    const imageBlob = new Blob([response.data], { type: "image/jpeg" });
    return imageBlob;
  } catch (error) {
    console.error("Error while fetching Gen AI model API", error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
};