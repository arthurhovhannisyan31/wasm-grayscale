use base64::decode;
use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

#[wasm_bindgen]
pub fn grayscale(encoded_file: &str) {
  let base64_to_vector = decode(encoded_file).unwrap();
  log(&"Image decoded".into());
  log(&base64_to_vector.into());
}

#[cfg(test)]
mod tests {
  #[test]
  fn it_works() {}
}
