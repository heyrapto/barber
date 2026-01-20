import * as THREE from 'three';

export interface Service {
  id: number;
  label: string;
}

export interface ClothShaderUniforms {
  uTime: { value: number };
  uTexture: { value: THREE.Texture | null };
  uHover: { value: number };
}